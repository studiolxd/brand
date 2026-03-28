import type { Token } from '../../tokens/utils';
import './TokenTable.css';

interface TokenTableProps {
  tokens: Token[];
}

export function TokenTable({ tokens }: TokenTableProps) {
  return (
    <table className="token-table">
      <thead>
        <tr>
          <th>Token</th>
          <th>Valor</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map(({ name, value, description }) => (
          <tr key={name}>
            <td><code className="token-table__name">{name}</code></td>
            <td><span className="token-table__value">{value}</span></td>
            <td><span className="token-table__description">{description ?? '—'}</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
