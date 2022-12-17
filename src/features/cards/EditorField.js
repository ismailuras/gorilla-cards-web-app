import { Controller, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Grid, GridItem, Textarea, Text } from "@chakra-ui/react";
function EditorField() {
  const { control, errors } = useFormContext();

  return (
    <>
      <Grid templateColumns="repeat(1)">
        <GridItem gridTemplateRows={"50px 1fr 30px"} colSpan={2}>
          <Text fontSize="24px">Front Of Card</Text>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: "This is a required field." },
            }}
            name="front"
            render={({ field: { onChange, onBlur, value } }) => (
              <Textarea
                width={450}
                height={160}
                p={3}
                outline="#808080 solid 2px"
                resize="none"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Here is a sample placeholder"
              />
            )}
          />
        </GridItem>
        <GridItem colStart={4} colEnd={6}>
          <Text fontSize="24px">Back of Card</Text>
          <Controller
            control={control}
            name="back"
            render={({ field: { onChange, onBlur, value } }) => (
              <Textarea
                width={450}
                height={160}
                p={3}
                resize="none"
                outline="#808080 solid 2px"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Here is a sample placeholder"
              />
            )}
          />
        </GridItem>
        <GridItem>
          <ErrorMessage
            errors={errors}
            name="front"
            render={({ message }) => (
              <div className="pl-1 pt-2 text-red-400 text-sm">{message}</div>
            )}
          />
        </GridItem>
      </Grid>
    </>
  );
}

export default EditorField;
