import React from "react";

import SingleInvoiceData from "@/components/single-invoice";
import { getSingleInvoice } from "@/actions/get-single-invoice";

interface Params {
  id: string;
}

interface PageProps {
  params: Promise<Params>;
}
const SingleInvoice = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id) {
    return <p>Invalid Invoice ID</p>;
  }

  const invoice = await getSingleInvoice(id);

  if (!invoice) {
    return <p>Invoice not found.</p>;
  }

  return <SingleInvoiceData invoice={invoice} />;
};

export default SingleInvoice;
