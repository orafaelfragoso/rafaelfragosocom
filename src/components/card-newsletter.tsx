"use client";

import { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Portal } from "@/components/portal";
import { useAudio } from "@/hooks/use-audio";
import Confetti from "react-confetti";
import { subscribe } from "@/actions/newsletter";
import { AudioContext } from "@/components/audio-provider";

export type CardNewsletterProps = {
  className?: string;
};

const schema = z
  .object({
    email: z.string().email("You need a valid email address"),
  })
  .required();

type SchemaType = z.infer<typeof schema>;

export function CardNewsletter({ className }: CardNewsletterProps) {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.BASE_URL;
  const { audioAllowed } = useContext(AudioContext);
  const [exploding, setExploding] = useState(false);
  const { play, volume } = useAudio(`${baseUrl}/coin.wav`);

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const { errors, isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<SchemaType> = async (values) => {
    try {
      const res: any = await subscribe(values.email);
      if (res?.error) {
        throw new Error();
      }

      if (audioAllowed) {
        volume(0.5);
        play();
      }
      setExploding(true);
      form.reset();
    } catch (error) {
      form.setError("email", {
        type: "custom",
        message: "E-mail is already registered",
      });
      form.setFocus("email");
    }
  };

  return (
    <>
      <Card className={`flex-1 w-full ${className}`}>
        <CardHeader className="space-y-0 pb-2">
          <CardTitle className="text-xl font-medium">Subscribe now!</CardTitle>
          <CardDescription>
            Join my newsletter and be informed on new articles, job alerts and
            tech news. I promise not to spam you with ads or miracle offers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2 w-full items-start md:flex-row md:gap-0 md:space-x-2 mt-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className={
                            errors?.email
                              ? "dark:focus-visible:ring-red-500 focus-visible:ring-red-500 ring-red-500"
                              : ""
                          }
                          placeholder="Your best email address"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      {errors?.email && (
                        <FormMessage>{errors?.email.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      {exploding && (
        <Portal>
          <Confetti
            recycle={false}
            onConfettiComplete={() => setExploding(false)}
          />
        </Portal>
      )}
    </>
  );
}
