type Entitiy = {
  id: string;
  name: string;
};

type SectionProps<T extends Entitiy> = {
  sectionName: string;
  entities: T[];
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  renderActions: (entity: T) => React.ReactNode;
};

const Section = <T extends Entitiy>({
  sectionName,
  entities,
  editingId,
  setEditingId,
  handleSubmit,
  renderActions,
}: SectionProps<T>) => {
  return (
    <section>
      <h2>{sectionName}s</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {entities.map((entity) => {
            return (
              <tr key={entity.id}>
                <td>{entity.id}</td>
                <td>{entity.name}</td>
                <td>{renderActions(entity)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr />
      <form onSubmit={handleSubmit}>
        <label htmlFor={sectionName.toLowerCase()}>{sectionName}</label>
        <input
          type="text"
          id={sectionName.toLowerCase()}
          name={sectionName.toLowerCase()}
        />
        <button type="submit">Add {sectionName}</button>
      </form>
    </section>
  );
};

export default Section;
