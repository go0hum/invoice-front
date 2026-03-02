import { useFormContext } from "react-hook-form";
import { InvoiceFormValues } from "@/schemas/invoice.schemas";

export const Cliente = () => {
    const { register, formState: { errors } } = useFormContext<InvoiceFormValues>();
    return (
        <>
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900">Compañia del cliente</h2>
                <p className="mt-1 text-sm/6 text-gray-600">Datos de la compañia del cliente</p>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                    <div className="col-span-full">
                        <label htmlFor="cliente_compania" className="block text-sm/6 font-medium text-gray-900">Compañia del cliente*</label>
                        <div className="mt-2">
                            <input id="cliente_compania" type="text" className={`input-invoice ${errors.cliente?.compania ? "border-red-500" : ""}`} {...register("cliente.compania")} />
                            {errors.cliente?.compania && <p className="text-red-500 text-sm">{errors.cliente.compania.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="cliente_nombre" className="block text-sm/6 font-medium text-gray-900">Nombre*</label>
                        <div className="mt-2">
                            <input id="cliente_nombre" type="text" className="input-invoice" {...register("cliente.nombre")} />
                            {errors.cliente?.nombre && <p className="text-red-500 text-sm">{errors.cliente.nombre.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="cliente_apellido" className="block text-sm/6 font-medium text-gray-900">Apellido*</label>
                        <div className="mt-2">
                            <input id="cliente_apellido" type="text" className="input-invoice" {...register("cliente.apellido")} />
                            {errors.cliente?.apellido && <p className="text-red-500 text-sm">{errors.cliente.apellido.message}</p>}
                        </div>
                    </div>

                    <div className="col-span-full sm:col-span-2">
                        <label htmlFor="cliente_email" className="block text-sm/6 font-medium text-gray-900">Correo electronico*</label>
                        <div className="mt-2">
                            <input id="cliente_email" type="email" className="input-invoice" {...register("cliente.email")} />
                            {errors.cliente?.email && <p className="text-red-500 text-sm">{errors.cliente.email.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="cliente_direccion" className="block text-sm/6 font-medium text-gray-900">Dirección</label>
                        <div className="mt-2">
                            <input id="cliente_direccion" type="text" className="input-invoice" {...register("cliente.direccion")} />
                            {errors.cliente?.direccion && <p className="text-red-500 text-sm">{errors.cliente.direccion.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="cliente_ciudad" className="block text-sm/6 font-medium text-gray-900">Ciudad</label>
                        <div className="mt-2">
                            <input id="cliente_ciudad" type="text" className="input-invoice" {...register("cliente.ciudad")} />
                            {errors.cliente?.ciudad && <p className="text-red-500 text-sm">{errors.cliente.ciudad.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="cliente_estado" className="block text-sm/6 font-medium text-gray-900">Estado</label>
                        <div className="mt-2">
                            <input id="cliente_estado" type="text" className="input-invoice" {...register("cliente.estado")} />
                            {errors.cliente?.estado && <p className="text-red-500 text-sm">{errors.cliente.estado.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="cliente_codigoPostal" className="block text-sm/6 font-medium text-gray-900">ZIP / Codigo postal</label>
                        <div className="mt-2">
                            <input id="cliente_codigoPostal" type="text" className="input-invoice" {...register("cliente.codigoPostal")} />
                            {errors.cliente?.codigoPostal && <p className="text-red-500 text-sm">{errors.cliente.codigoPostal.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="cliente_pais" className="block text-sm/6 font-medium text-gray-900">Pais</label>
                        <div className="mt-2 grid grid-cols-1">
                            <select id="cliente_pais" {...register("cliente.pais")} className="select-invoice">
                                <option>Mexico</option>
                                <option>United States</option>
                                <option>Canada</option>
                            </select>
                            <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                                <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
                            </svg>
                            {errors.cliente?.pais && <p className="text-red-500 text-sm">{errors.cliente.pais.message}</p>}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}