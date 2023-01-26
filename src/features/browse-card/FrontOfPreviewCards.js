import ReactMarkdown from "react-markdown";

function FrontOfCards({ seedData }) {
  return (
    <div className="w-1/3">
      {seedData.map((words) => (
        <div className="border-b-2 h-[300px]" key={words.id}>
          <ReactMarkdown className="text-xl font-medium  leading-9">
            {`${words.note}. `}
          </ReactMarkdown>
        </div>
      ))}
    </div>
  );
}

export default FrontOfCards;
