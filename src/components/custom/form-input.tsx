/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { id } from "date-fns/locale"; // Indonesian locale
import { FloatingMain } from "./floating-input";
import { toCapitalize } from "@/lib/toCapitalize";

interface InputFormProps {
  form: ReturnType<typeof useForm<any>>;
  fieldName: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  isFloating?: boolean;
}

export function InputForm({
  form,
  fieldName,
  placeholder,
  type,
  disabled,
  className,
  isFloating,
}: InputFormProps) {
  return (
    <div className={className}>
      <Form {...form}>
        <FormField
          control={form.control}
          name={fieldName as any}
          render={({ field }) => (
            <FormItem>
              <Popover>
                <FormLabel className={isFloating ? "hidden" : ""}>
                  {placeholder}
                </FormLabel>
                <FormControl>
                  {type === "date" ? (
                    <>
                      <PopoverTrigger asChild>
                        <Button
                          data-id={`button-calendar-${fieldName}`}
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: id }) // Use Indonesian locale here
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                        data-id="date-picker-content"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: Date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </>
                  ) : isFloating ? (
                    <FloatingMain
                      type={type}
                      id={toCapitalize(placeholder)}
                      label={toCapitalize(placeholder)}
                      disabled={disabled}
                      isNumbers={type === "Numbers"}
                      isPhone={type === "Phone"}
                      isRupiah={type === "Rupiah"}
                      className="w-full"
                      {...field}
                      value={field.value ?? ""}
                    />
                  ) : (
                    <Input
                      data-id={`input-${fieldName}`}
                      disabled={disabled}
                      isNumbers={type === "Numbers"}
                      isPhone={type === "Phone"}
                      isRupiah={type === "Rupiah"}
                      className="w-full"
                      type={type}
                      placeholder={placeholder?.toLowerCase()}
                      {...field}
                      value={field.value ?? ""}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </Popover>
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
}
