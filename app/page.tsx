"use client";

import { Emisor } from "./components/emisor";
import { Cliente } from "./components/cliente";
import { Invoice } from "./components/invoice";
import { Items } from "./components/items"
import { Upload } from "./components/upload";
import { useForm, FormProvider } from "react-hook-form";
import { invoiceSchema, InvoiceFormValues } from "@/schemas/invoice.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export default function Home() {

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const methods = useForm({
    resolver: zodResolver(invoiceSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      logo: "",
      emisor: {
        compania: "",
        nombre: "",
        apellido: "",
        sitioweb: "",
        telefono: "",
        email: "",
        direccion: "",
        ciudad: "",
        estado: "",
        codigoPostal: "",
      },
      cliente: {
        compania: "",
        nombre: "",
        apellido: "",
        email: "",
        direccion: "",
        ciudad: "",
        estado: "",
        codigoPostal: "",
      },
      numeroFactura: "",
      fechaFactura: "",
      fechaVencimiento: "",
      items: [{ id: '01', tipo: 'Servicio', descripcion: 'Servicio de consultoría', cantidad: 1, precio: 1000 }],
      impuesto: 0,
      descuento: 0,
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-MX");
  };

  const HandleSubmit = async (data: InvoiceFormValues) => {
    try {
      setSuccessMessage(null);
      setErrorMessage(null);
      const baseUrl = process.env.NEXT_PUBLIC_ONBOARD_URL;
      const formData = new FormData();
      if (data.logo && data.logo[0]) {
        formData.append("logo", data.logo[0]);
      }
      formData.append("emisor", JSON.stringify(data.emisor));
      formData.append("cliente", JSON.stringify(data.cliente));
      formData.append("numeroFactura", data.numeroFactura);
      formData.append("fechaFactura", formatDate(data.fechaFactura));
      formData.append("fechaVencimiento", formatDate(data.fechaVencimiento));
      formData.append("items", JSON.stringify(data.items));
      formData.append("impuesto", data.impuesto.toString());
      formData.append("descuento", data.descuento.toString());

      const res = await fetch(`${baseUrl}/api/invoice`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      const response = await res.json();
      setSuccessMessage(
        `Factura generada correctamente: ${response.url}`
      );
      methods.reset();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to submit form."
      );
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 my-6 uppercase">Generar Factura</h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(HandleSubmit)}>
          <div className="space-y-12">
            <Upload />
            <Emisor />
            <Cliente />
            <Invoice />
            <Items />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 text-center">
            {successMessage && <p className="text-green-700 text-2xl sm:col-span-full">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 text-2xl sm:col-span-full">{errorMessage}</p>}
          </div>

          <div className="my-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm/6 font-semibold text-gray-900 flex-shrink-0"
              onClick={() => { methods.reset(); setSuccessMessage(null); setErrorMessage(null); }}
              disabled={methods.formState.isSubmitting}
            >
              Limpiar
            </button>
            <button
              type="submit"
              disabled={methods.formState.isSubmitting || methods.formState.isSubmitSuccessful}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              {methods.formState.isSubmitting
                ? "Generando..."
                : methods.formState.isSubmitSuccessful
                  ? "Factura generada"
                  : "Generar factura"}
            </button>
          </div>



        </form>
      </FormProvider>


    </div>
  );
}
