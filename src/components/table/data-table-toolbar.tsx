import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";

import { DataTableFacetedFilter } from "@/components/table/data-table-faceted-filter";
import * as ReactTable from "@tanstack/react-table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { status, typeOfUker } from "@/data/routers/routers";
import { toast } from "sonner";
import useDialogStore from "@/hooks/store/use-dialog";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { openDialog } = useDialogStore();
  // Get selected rows
  const selectedRows = table.getSelectedRowModel().rows;

  // Delete handler
  async function handleDeleteSelected(selectedRows: ReactTable.Row<TData>[]) {
    const selectedIds = selectedRows.map(
      (row) => (row.original as { id: string }).id
    );
    console.log(selectedIds);
    // const result = await removeRouter(selectedIds);

    // if (result.success) {
    //   if ("data" in result) {
    //     table.resetRowSelection();
    //     toast.success(`Berhasil Menghapus ${result.data.count} Data`);
    //   } else {
    //     // Handle the case where result does not have a data property
    //     toast.success("Berhasil Menghapus Data");
    //   }
    // } else if (result.success === false && result.error) {
    //   // Tampilkan pesan error dari server jika ada
    //   toast.error(JSON.stringify(result.error));
    // } else {
    //   toast.error("Gagal Menghapus Data");
    //   console.error(result.error);
    // }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={
            (table.getColumn("nameUker")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("nameUker")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={status}
          />
        )}
        {table.getColumn("typeOfUker") && (
          <DataTableFacetedFilter
            column={table.getColumn("typeOfUker")}
            title="jenis Uker"
            options={typeOfUker}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        {/* delete button in this */}
        {selectedRows.length > 0 && (
          <Button
            variant="destructive"
            size={"sm"}
            onClick={() => handleDeleteSelected(selectedRows)}
          >
            {`Delete ${selectedRows.length} Selected`}
          </Button>
        )}
      </div>
      <div className="flex items-center justify-between gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm">Tambah Data</Button>
          </PopoverTrigger>
          <PopoverContent side="left" className="max-w-[150px]">
            <div className="flex flex-col gap-2">
              <Button size="sm" onClick={() => openDialog("Import Excel")}>
                Tambah Excel
              </Button>
              <Button size="sm" onClick={() => openDialog("Create Router")}>
                Tambah Data
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
