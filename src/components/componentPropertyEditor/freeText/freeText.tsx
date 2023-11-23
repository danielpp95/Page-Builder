interface freeTextProps {
    name: string;
    value: string;
    updater: (newValue: string) => void;
}

export default function freeText({
    name,
    value,
    updater}: freeTextProps) {
  return (
    <>
        <span>{name}</span>
        <input type="text" value={value} onChange={(e) => updater(e.target.value)} />
    </>
  )
}
