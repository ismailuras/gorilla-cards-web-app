import ReactMarkdown from "react-markdown";

function FrontOfCards({ seedData }) {
  return (
    <div className="w-2/3">
      {seedData.map((words) => (
        <div
          className="h-[300px] flex justify-center items-center"
          key={words.id}>
          <ReactMarkdown className="text-xl font-medium  leading-9">
            {`${words.note}. `}
          </ReactMarkdown>
        </div>
      ))}
    </div>
  );
}

export default FrontOfCards;
