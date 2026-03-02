import { useFormContext } from "react-hook-form";
import { InvoiceFormValues } from "@/schemas/invoice.schemas";
import { Picture } from "../../components/picture";
import Image from "next/image";

export const Upload = () => {
    const { register, watch, formState: { errors } } = useFormContext<InvoiceFormValues>();

    const logoFiles = watch("logo");
    const logoFile = (logoFiles && logoFiles.length > 0) ? logoFiles[0] : null;

    return (
        <>
            <div className="col-span-3">
                <label htmlFor="logo" className="block text-sm/6 font-medium text-gray-900">Logo de la compañia</label>
                <div className={`mt-2 flex justify-center rounded-lg border border-dashed ${errors.logo ? "border-red-500" : "border-gray-900/25"} px-6 py-10`}>
                    <div className="text-center">
                        {logoFile ? (
                            <Image
                                src={URL.createObjectURL(logoFile)}
                                alt="Logo preview"
                                width={120}
                                height={120}
                                className="mx-auto rounded-lg object-contain h-24 w-auto"
                            />
                        ) : (
                            <Picture />
                        )}
                        <div className="mt-4 flex justify-center text-sm/6 text-gray-600">
                            <label htmlFor="logo" className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500">
                                <span>Subir archivo</span>
                                <input
                                    id="logo"
                                    type="file"
                                    accept="image/png, image/jpeg, image/gif"
                                    className="sr-only"
                                    {...register("logo")}
                                />
                            </label>
                        </div>
                        <p className="text-xs/5 text-gray-600">PNG, JPG, GIF hasta 10MB</p>
                    </div>
                </div>
                {errors.logo && (
                    <p className="text-red-500 text-sm mt-2">{errors.logo.message as string}</p>
                )}
            </div>
        </>
    );
};