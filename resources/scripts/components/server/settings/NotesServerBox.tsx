import React from "react";
import { ServerContext } from "@/state/server";
import TitledGreyBox from "@/components/elements/TitledGreyBox";
import { Form, Formik, FormikHelpers, useFormikContext } from "formik";
import { Actions, useStoreActions } from "easy-peasy";
import renameServer from "@/api/server/renameServer";
import { object, string } from "yup";
import SpinnerOverlay from "@/components/elements/SpinnerOverlay";
import { ApplicationStore } from "@/state";
import { httpErrorToHuman } from "@/api/http";
import Button from "@/components/elements/Button";
import tw from "twin.macro";
import Field from "@/components/elements/TextArea";

interface Values {
  notes: string;
}

const NotesServerBox = () => {
  const { isSubmitting } = useFormikContext<Values>();
  return (
    <TitledGreyBox title={"Server Notes"} css={tw`relative`}>
      <SpinnerOverlay visible={isSubmitting} />
      <Form css={tw`mb-0`}>
        <Field
          id={"notes"}
          name={"notes"}
          label={""}
          type={"text"}
          placeholder={"Notes"}
        />
        <div css={tw`mt-6 text-right`}>
          <Button type={"submit"}>Save</Button>
        </div>
      </Form>
    </TitledGreyBox>
  );
};

export default () => {
  const server = ServerContext.useStoreState((state) => state.server.data!);
  const setServer = ServerContext.useStoreActions(
    (actions) => actions.server.setServer
  );
  const { addError, clearFlashes } = useStoreActions(
    (actions: Actions<ApplicationStore>) => actions.flashes
  );

  const submit = (
    { notes }: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    clearFlashes("settings");
    renameServer(server.uuid, notes, "notes")
      .then(() => setServer({ ...server, notes }))
      .catch((error) => {
        console.error(error);
        addError({ key: "settings", message: httpErrorToHuman(error) });
      })
      .then(() => setSubmitting(false));
  };

  return (
    <Formik
      onSubmit={submit}
      initialValues={{
        notes: server.notes,
      }}
      validationSchema={object().shape({
        notes: string().required().min(1),
      })}
    >
      <NotesServerBox />
    </Formik>
  );
};
