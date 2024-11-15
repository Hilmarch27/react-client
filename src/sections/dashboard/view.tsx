/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputForm } from "@/components/custom/form-input";
import { Button } from "@/components/ui/button";
import { routerField } from "@/data/routers/routers";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function DashboardView() {
  const form = useForm<any>();

  const onSubmit = async (data: any) => {
    console.log(data);
    toast.success("Berhasil Tambah Data");
  };
  return (
    <>
      {routerField.map((item, idx) => (
        <InputForm
          key={idx}
          type={item.type}
          form={form}
          fieldName={item.value}
          placeholder={item.label}
          isFloating
        />
      ))}
      <Button onClick={form.handleSubmit(onSubmit)}>Simpan</Button>
    </>
  );
}

export default DashboardView;
