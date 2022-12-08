import { Controller, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Textarea } from "@chakra-ui/react";
function EditorField() {
  const { control, errors } = useFormContext();

  return (
    <div>
      <div className="flex gap-4 items-center p-5">
        <div>
          <div>
            <h5 className="font-semibold mb-3 block">Front</h5>
          </div>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: "This is a required field." },
            }}
            name="front"
            render={({ field: { onChange, onBlur, value } }) => (
              <Textarea
                width={310}
                height={150}
                p={10}
                outline="#808080 solid 2px"
                resize="none"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Here is a sample placeholder"
              />
            )}
          />
          <ErrorMessage
            errors={errors}
            name="front"
            render={({ message }) => (
              <div className="pl-1 pt-2 text-red-400 text-sm">{message}</div>
            )}
          />
        </div>
        <div>
          <div>
            <h5 className="font-semibold mb-3 block">Back</h5>
          </div>
          <Controller
            control={control}
            name="back"
            render={({ field: { onChange, onBlur, value } }) => (
              <Textarea
                width={310}
                height={150}
                p={10}
                resize="none"
                outline="#808080 solid 2px"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Here is a sample placeholder"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default EditorField;
