import { useFormContext } from "react-hook-form";
import { InvoiceFormValues } from "@/schemas/invoice.schemas";

export const Emisor = () => {
    const { register, formState: { errors } } = useFormContext<InvoiceFormValues>();
    return (
        <>
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900">Tu compañia</h2>
                <p className="mt-1 text-sm/6 text-gray-600">Datos de la compañia que emite la factura</p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                        <label htmlFor="compania" className="block text-sm/6 font-medium text-gray-900">Compañia del cliente</label>
                        <div className="mt-2">
                            <input
                                id="compania"
                                type="text"
                                className="input-invoice"
                                placeholder="Compañia del cliente"
                                {...register("emisor.compania")}
                            />
                            {errors.emisor?.compania && <p className="text-red-500 text-sm">{errors.emisor.compania.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="emisor_nombre" className="block text-sm/6 font-medium text-gray-900">Nombre*</label>
                        <div className="mt-2">
                            <input id="emisor_nombre" type="text" className="input-invoice" {...register("emisor.nombre")} />
                            {errors.emisor?.nombre && <p className="text-red-500 text-sm">{errors.emisor.nombre.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="emisor_apellido" className="block text-sm/6 font-medium text-gray-900">Apellido*</label>
                        <div className="mt-2">
                            <input id="emisor_apellido" type="text" className="input-invoice"     {...register("emisor.apellido")} />
                            {errors.emisor?.apellido && <p className="text-red-500 text-sm">{errors.emisor.apellido.message}</p>}
                        </div>
                    </div>

                    <div className="col-span-full sm:col-span-2">
                        <label htmlFor="emisor_sitioweb" className="block text-sm/6 font-medium text-gray-900">Sitio web*</label>
                        <div className="mt-2">
                            <input id="emisor_sitioweb" type="text" className="input-invoice" {...register("emisor.sitioweb")} />
                            {errors.emisor?.sitioweb && <p className="text-red-500 text-sm">{errors.emisor.sitioweb.message}</p>}
                        </div>
                    </div>

                    <div className="col-span-full sm:col-span-2">
                        <label htmlFor="emisor_telefono" className="block text-sm/6 font-medium text-gray-900">Numero de telefono*</label>
                        <div className="mt-2">
                            <input id="emisor_telefono" type="text" className="input-invoice" {...register("emisor.telefono")} />
                            {errors.emisor?.telefono && <p className="text-red-500 text-sm">{errors.emisor.telefono.message}</p>}
                        </div>
                    </div>

                    <div className="col-span-full sm:col-span-2">
                        <label htmlFor="emisor_email" className="block text-sm/6 font-medium text-gray-900">Correo electronico*</label>
                        <div className="mt-2">
                            <input id="emisor_email" type="email" className="input-invoice" {...register("emisor.email")} />
                            {errors.emisor?.email && <p className="text-red-500 text-sm">{errors.emisor.email.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="emisor_direccion" className="block text-sm/6 font-medium text-gray-900">Dirección</label>
                        <div className="mt-2">
                            <input id="emisor_direccion" type="text" className="input-invoice" {...register("emisor.direccion")} />
                            {errors.emisor?.direccion && <p className="text-red-500 text-sm">{errors.emisor.direccion.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="emisor_ciudad" className="block text-sm/6 font-medium text-gray-900">Ciudad</label>
                        <div className="mt-2">
                            <input id="emisor_ciudad" type="text" className="input-invoice" {...register("emisor.ciudad")} />
                            {errors.emisor?.ciudad && <p className="text-red-500 text-sm">{errors.emisor.ciudad.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="emisor_estado" className="block text-sm/6 font-medium text-gray-900">Estado</label>
                        <div className="mt-2">
                            <input id="emisor_estado" type="text" className="input-invoice" {...register("emisor.estado")} />
                            {errors.emisor?.estado && <p className="text-red-500 text-sm">{errors.emisor.estado.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="emisor_codigoPostal" className="block text-sm/6 font-medium text-gray-900">ZIP / Codigo postal</label>
                        <div className="mt-2">
                            <input id="emisor_codigoPostal" type="text" className="input-invoice" {...register("emisor.codigoPostal")} />
                            {errors.emisor?.codigoPostal && <p className="text-red-500 text-sm">{errors.emisor.codigoPostal.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="emisor_pais" className="block text-sm/6 font-medium text-gray-900">Pais</label>
                        <div className="mt-2 grid grid-cols-1">
                            <select id="emisor_pais" className="select-invoice" {...register("emisor.pais")}>
                                <option>Mexico</option>
                                <option>United States</option>
                                <option>Canada</option>
                            </select>
                            <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                                <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
                            </svg>
                        </div>
                        {errors.emisor?.pais && <p className="text-red-500 text-sm">{errors.emisor.pais.message}</p>}
                    </div>
                </div>
            </div>
        </>
    );
};