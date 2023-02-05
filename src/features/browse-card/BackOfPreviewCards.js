function BackOfPreviewCards({ seedData }) {
  const groupDefinition = seedData.map((words) => {
    return words.tr.definitions.reduce((defs, acc) => {
      defs[acc.category] = defs[acc.category] || [];
      defs[acc.category].push(acc);
      return defs;
    }, Object.create(null));
  });
  return (
    <div>
      {groupDefinition.map((groups, i) => (
        <div className="h-[300px] overflow-scroll" key={i}>
          {Object.keys(groups).map((category, i) => (
            <div className="px-3" key={i}>
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
