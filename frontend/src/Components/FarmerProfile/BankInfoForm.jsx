import InputField from "./InputField";

function BankInfoForm({ data, onChange }) {
    // BankForm
    const fields = [
        { name: "bankName", label: "Bank Name", type: "text" },
        { name: "accountHolderName", label: "Account Holder Name", type: "text" },
        { name: "accountNumber", label: "Account Number", type: "text" },
        { name: "ifscCode", label: "IFSC", type: "text" },
        { name: "upiId", label: "UPI", typ: "text" },
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

export default BankInfoForm;