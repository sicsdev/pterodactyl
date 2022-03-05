import React, { forwardRef } from "react";
import { Field as FormikField, FieldProps } from "formik";
import Label from "@/components/elements/Label";
import { Textarea } from "@/components/elements/Input";

interface OwnProps {
  name: string;
  light?: boolean;
  label?: string;
  description?: string;
  validate?: (value: any) => undefined | string | Promise<any>;
}

type Props = OwnProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">;

const Field = forwardRef<HTMLInputElement, Props>(
  (
    { id, name, light = false, label, description, validate, ...props },
    ref
  ) => (
    <FormikField innerRef={ref} name={name} validate={validate}>
      {({ field, form: { errors, touched } }: FieldProps) => (
        <div>
          {label && (
            <Label htmlFor={id} isLight={light}>
              {label}
            </Label>
          )}
          <Textarea
            id={id}
            {...field}
            {...props}
            className={
              "Input__Textarea-sc-19rce1w-1 NotesServerBox___StyledTextarea-wtv6ry-2 Juohr gzhqXY"
            }
            style={{
              width: "100%",
              borderRadius: "5px",
              color:
                "rgba(201.75599999999997,209.1,216.444,var(--tw-text-opacity))",
              backgroundColor:
                "background-color: rgba(81.14099999999998,94.79029999999999,107.55900000000001,var(--tw-bg-opacity))",
              fontSize: "0.875rem",
            }}
          />
          {touched[field.name] && errors[field.name] ? (
            <p className={"input-help error"}>
              {(errors[field.name] as string).charAt(0).toUpperCase() +
                (errors[field.name] as string).slice(1)}
            </p>
          ) : description ? (
            <p className={"input-help"}>{description}</p>
          ) : null}
        </div>
      )}
    </FormikField>
  )
);
Field.displayName = "Field";

export default Field;
