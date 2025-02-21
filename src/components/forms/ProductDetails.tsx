import { InvoiceFormData } from "@/schemas";
import { Trash } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function ProductDetails() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<InvoiceFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded-lg space-y-4">
          <div className="flex justify-between">
            <h4 className="font-medium">Item {index + 1}</h4>
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-500 justify-center flex items-center"
            >
              <Trash className="mr-2 w-4 h-4s" /> Remove
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                {...register(`items.${index}.name`)}
                className="w-full p-2 border rounded-lg"
              />
              {errors.items?.[index]?.name && (
                <p className="text-red-500 text-sm">
                  {errors.items[index]?.name?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                {...register(`items.${index}.price`, { valueAsNumber: true })}
                className="w-full p-2 border rounded-lg"
              />
              {errors.items?.[index]?.price && (
                <p className="text-red-500 text-sm">
                  {errors.items[index]?.price?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                {...register(`items.${index}.quantity`, {
                  valueAsNumber: true,
                })}
                className="w-full p-2 border rounded-lg"
              />
              {errors.items?.[index]?.quantity && (
                <p className="text-red-500 text-sm">
                  {errors.items[index]?.quantity?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                {...register(`items.${index}.description`)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            id: Math.random().toString(),
            name: "",
            price: 0,
            stock: 0,
            description: "",
            quantity: 1,
          })
        }
        className="w-full p-2 bg-gradient-to-b from-gray-500 to-gray-600 text-white rounded-lg"
      >
        Add Product
      </button>
    </div>
  );
}
