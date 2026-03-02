import { InvoiceFormValues } from "@/schemas/invoice.schemas";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { TrashIcon } from '@heroicons/react/24/solid';
import { useEffect, useMemo } from "react";

export const Items = () => {

    const { control, register, trigger, formState: { errors }, watch, setValue } = useFormContext<InvoiceFormValues>();
    const impuesto = watch("impuesto");
    const descuento = watch("descuento");

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    const itemsWatch = useWatch({
        control,
        name: "items",
    });

    const subtotal = useMemo(
        () => fields.reduce((sum, i) => sum + i.cantidad * i.precio, 0),
        [fields]
    )
    const total = useMemo(() => {
        if (itemsWatch.every((item) => item.tipo === "Producto")) {
            const cantidadImpuesto = (impuesto * subtotal / 100);
            const totalConImpuesto = subtotal + cantidadImpuesto;
            const cantidadDescuento = (descuento * totalConImpuesto / 100);
            return totalConImpuesto - cantidadDescuento;
        }
        if (itemsWatch.every((item) => item.tipo === "Servicio")) {
            const cantidadDescuento = (descuento * subtotal / 100);
            const totalConDescuento = subtotal - cantidadDescuento;
            const cantidadImpuesto = (impuesto * subtotal / 100);
            return totalConDescuento + cantidadImpuesto;
        }
        return 0;
    }, [subtotal, impuesto, descuento, itemsWatch])

    const addConcepto = () => {
        append({
            id: "00",
            tipo: "Servicio",
            descripcion: "Servicio de consultoría",
            cantidad: 1,
            precio: 1000,
        });
        trigger("items");
    };

    const removeConcepto = (index: number) => {
        remove(index);
        trigger("items");
    };

    return (
        <>
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900">Conceptos</h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-6">

                    <table className="table-auto col-span-full">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Tipo</th>
                                <th>Descripción</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                fields.map((field, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <input id="street-address" type="text" placeholder="Identificador*" className="input-invoice" {...register(`items.${index}.id`)} />
                                                {errors.items?.[index]?.id && <p className="text-red-500 text-sm">{errors.items[index].id.message}</p>}
                                            </td>
                                            <td><select id="tipo" className="select-invoice" {...register(`items.${index}.tipo`)} onChange={(e) => {
                                                setValue(`items.${index}.tipo`, e.target.value);
                                                trigger("items");
                                            }}>
                                                <option value="Servicio">Servicio</option>
                                                <option value="Producto">Producto</option>
                                            </select>
                                                {errors.items?.[index]?.tipo && <p className="text-red-500 text-sm">{errors.items[index].tipo.message}</p>}
                                            </td>
                                            <td>
                                                <input id="first-name" type="text" className="input-invoice" {...register(`items.${index}.descripcion`)} />
                                                {errors.items?.[index]?.descripcion && <p className="text-red-500 text-sm">{errors.items[index].descripcion.message}</p>}
                                            </td>
                                            <td>
                                                <select id="cantidad" className="select-invoice" {...register(`items.${index}.cantidad`)}>
                                                    {Array.from({ length: 10 }, (_, i) => (
                                                        <option key={i} value={i}>{i}</option>
                                                    ))}
                                                </select>
                                                {errors.items?.[index]?.cantidad && <p className="text-red-500 text-sm">{errors.items[index].cantidad.message}</p>}
                                            </td>
                                            <td>
                                                <input id="first-name" type="text" className="input-invoice" {...register(`items.${index}.precio`)} />
                                                {errors.items?.[index]?.precio && <p className="text-red-500 text-sm">{errors.items[index].precio.message}</p>}
                                            </td>
                                            <td><button type="button" onClick={() => removeConcepto(index)}>
                                                <TrashIcon className="size-6 text-red-500 ml-4" />
                                            </button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                    {errors.items?.root?.message && (
                        <p className="text-red-500 text-sm col-span-full">{errors.items.root.message}</p>
                    )}

                    {errors.items?.message && (
                        <p className="text-red-500 text-sm col-span-full">{errors.items?.message}</p>
                    )}

                    <div className="sm:col-span-2">
                        <button type="button" onClick={() => { addConcepto(); }}>+ Agregar Concepto</button>
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="impuesto" className="block text-sm/6 font-medium text-gray-900">Impuesto*</label>
                    <div className="mt-2">
                        <input id="impuesto" type="text" className="input-invoice" {...register("impuesto")} />
                        {errors.impuesto && <p className="text-red-500 text-sm">{errors.impuesto.message}</p>}
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="descuento" className="block text-sm/6 font-medium text-gray-900">Descuento*</label>
                    <div className="mt-2">
                        <input id="descuento" type="text" className="input-invoice" {...register("descuento")} />
                        {errors.descuento && <p className="text-red-500 text-sm">{errors.descuento.message}</p>}
                    </div>
                </div>

                <div className="col-span-full text-right mt-6">
                    <p className="text-bold text-gray-900 text-4xl">Subtotal: $ {subtotal}</p>
                    <p className="text-bold text-gray-900 text-2xl">Impuesto: {impuesto} %</p>
                    <p className="text-bold text-gray-900 text-2xl">Descuento: {descuento} %</p>
                    <p className="text-bold text-gray-900 text-6xl">Total: $ {total}</p>
                </div>
            </div>
        </>
    )
}