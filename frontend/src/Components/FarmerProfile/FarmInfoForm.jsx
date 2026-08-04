import InputField from "./InputField";

function FarmInfoForm({ data, onChange }) {

    // FarmForm
    const fields = [
        { name: "farm", label: "Farm Name", type: "text" },
        { name: "size", label: "Farm Size", type: "text" },
        { name: "village", label: "Village", type: "text" }

    ];
    return (
        <>

            {fields.map(field => (
                <InputField
                    type={field.type}
                    name={field.name}
                    value={data[field.name] || ""}
                    label={field.label}
                    onChange={onChange}
                />
            ))}
        </>);
}

export default FarmInfoForm;