function BackOfPreviewCards({ seedData }) {
  const groupDefinition = seedData.map((words) => {
    return words.tr.definitions.reduce((defs, acc) => {
      defs[acc.category] = defs[acc.category] || [];
      defs[acc.category].push(acc);
      return defs;
    }, Object.create(null));
  });
  return (
    <div className="w-2/3">
      {groupDefinition.map((groups, i) => (
        <div className="border-b-2 h-[300px] overflow-auto" key={i}>
          {Object.keys(groups).map((category, i) => (
            <div key={i}>
              <b>{category}</b>
              {[...new Set(groups[category])]
                .map((groupItem) => ` ${groupItem.tr} (${groupItem.type})`)
                .join(", ")}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default BackOfPreviewCards;
