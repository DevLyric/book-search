import { ChangeEvent, FormEvent } from "react";

interface Form {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent) => void;
}

export default function Form({ value, onChange, onSubmit }: Form) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-3 my-8"
      action=""
    >
      <input
        type="text"
        placeholder="Enter book name"
        className="grow p-2 border outline-none rounded"
        value={value}
        onChange={onChange}
      />

      <button
        type="submit"
        className="rounded p-2 bg-blue-500 text-white font-medium"
      >
        Search
      </button>
    </form>
  );
}
