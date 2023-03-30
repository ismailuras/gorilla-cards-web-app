import { Controller, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Textarea, Text, Box, Center } from "@chakra-ui/react";
function EditorField() {
  const { control, errors } = useFormContext();

  return (
    <Box>
      <Center flex flexDirection="column">
        <Text fontSize="20px">Front Of Card</Text>
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
        <Text fontSize="20px">Back Of Card</Text>
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
      </Center>
      <ErrorMessage
        errors={errors}
        name="front"
        render={({ message }) => (
          <div className="pl-1 pt-2 text-red-400 text-sm">{message}</div>
        )}
      />
    </Box>
  );
}

export default EditorField;
