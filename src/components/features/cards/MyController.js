import { Controller, useFormContext } from "react-hook-form";
import { Editor } from "@toast-ui/react-editor";
import { useRef } from "react";
import "./toast-editor.css";
function MyController({ forceRenderState }) {
  const editorFrontRef = useRef();
  const editorBackRef = useRef();

  const handleChange = (onChange, currentRef) => () => {
    const cardData = currentRef.current.getInstance().getMarkdown();
    return onChange(cardData);
  };

  const { control } = useFormContext();

  return (
    <div key={forceRenderState}>
      <div className="flex justify-center items-center">
        <div className="w-1/2 mt-10">
          <Controller
            control={control}
            rules={{ required: true }}
            name="cardFront"
            render={({
              field: { onChange, onBlur },
              fieldState: { errors },
            }) => (
              <Editor
                initialEditType="wysiwyg"
                initialValue="# "
                onChange={handleChange(onChange, editorFrontRef)}
                onBlur={onBlur}
                ref={editorFrontRef}
              />
            )}
          />
        </div>
        <div className="w-1/2 mt-10">
          <Controller
            control={control}
            name="cardBack"
            render={({ field: { onChange, onBlur } }) => (
              <Editor
                initialEditType="wysiwyg"
                initialValue="# "
                onChange={handleChange(onChange, editorBackRef)}
                onBlur={onBlur}
                ref={editorBackRef}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default MyController;
