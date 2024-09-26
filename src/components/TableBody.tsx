interface TableBodyProps {
  data: { ID: number; Username: string; Score: number | null }[];
}

export function TableBody({ data }: TableBodyProps) {
  return (
    <tbody>
      {data.map((data, index) => (
        <tr key={data.ID}>
          <td>{index + 1}</td>
          <td>{data.Username}</td>
          <td>{data.Score}</td>
        </tr>
      ))}
    </tbody>
  );
}
