import { useFormContext, Controller } from "react-hook-form";
import { InvoiceFormValues } from "@/schemas/invoice.schemas";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Invoice = () => {

    const { control, register, formState: { errors } } = useFormContext<InvoiceFormValues>();

    return (
        <>
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900">Datos de facturación</h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                    <div className="sm:col-span-2">
                        <label htmlFor="numeroFactura" className="block text-sm/6 font-medium text-gray-900">Numero de factura*</label>
                        <div className="mt-2">
                            <input id="numeroFactura" type="text" className="input-invoice" {...register("numeroFactura")} />
                            {errors.numeroFactura && <p className="text-red-500 text-sm">{errors.numeroFactura.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="fechaFactura" className="block text-sm/6 font-medium text-gray-900">Fecha de factura*</label>
                        <div className="mt-2">
                            <Controller
                                control={control}
                                name="fechaFactura"
                                render={({ field }) => (
                                    <DatePicker
                                        showMonthDropdown
                                        showYearDropdown
                                        autoComplete="off"
                                        id="fechaFactura"
                                        className="input-invoice"
                                        placeholderText="Seleccionar fecha"
                                        selected={field.value ? new Date(field.value) : null}
                                        onChange={(date: Date | null) => field.onChange(date ? date.toDateString() : "")}
                                        dateFormat="dd/MM/yyyy"
                                    />
                                )}
                            />
                            {errors.fechaFactura && <p className="text-red-500 text-sm">{errors.fechaFactura.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="fechaVencimiento" className="block text-sm/6 font-medium text-gray-900">Vencimiento de factura*</label>
                        <div className="mt-2">
                            <Controller
                                control={control}
                                name="fechaVencimiento"
                                render={({ field }) => (
                                    <DatePicker
                                        showMonthDropdown
                                        showYearDropdown
                                        autoComplete="off"
                                        id="fechaVencimiento"
                                        className="input-invoice"
                                        placeholderText="Seleccionar fecha"
                                        selected={field.value ? new Date(field.value) : null}
                                        onChange={(date: Date | null) => field.onChange(date ? date.toDateString() : "")}
                                        dateFormat="dd/MM/yyyy"
                                    />
                                )}
                            />
                            {errors.fechaVencimiento && <p className="text-red-500 text-sm">{errors.fechaVencimiento.message}</p>}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}