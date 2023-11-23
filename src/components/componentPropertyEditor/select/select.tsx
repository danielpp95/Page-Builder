interface selectProps {
    name: string;
    value: string;
    updater: (newValue: string) => void;
    options: any;
}

export default function freeText({
    name,
    value,
    updater,
    options}: selectProps) {
  return (
    <>
        <span>{name}</span>
        <select
            value={value}
            onChange={(e) => updater(e.target.value)}>
                {
                    options.map((x:string) => (
                        <option value={x} key={x}>
                            {x}
                        </option>
                    ))
                }
        </select>
    </>
  )
}
