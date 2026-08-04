import InputField from "./InputField";

function InfoForm({ data, onChange }) {
    // InfoForm
    const fields = [
        { name: "name", label: "Full Name", type: "text" },
        { name: "phone", label: "Phone", type: "tel" },
        { name: "email", label: "Email", type: "email" },
        { name: "location", label: "Location", type: "text" }
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
        </>
    );
}

export default InfoForm;