import { Form } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { LuView } from "react-icons/lu";
import { FaEdit, FaWpforms } from "react-icons/fa";
import { BiRightArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function FormCard({ form }: { form: Form }) {
  return (
    <Card className="shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300 h-[190px] flex flex-col">
      <CardHeader className="bg-gray-100 border-b border-dashed border-secondary rounded-t-lg pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-800 truncate">
            {form.name}
          </CardTitle>
          <Badge
            className={`px-2 py-1 ${
              form.published
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {form.published ? "Publicado" : "Rascunho"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col justify-between">
        <CardDescription className="text-sm text-gray-600 flex-grow">
          {form.description ? (
            form.description
          ) : (
            <span className="flex items-center justify-center text-gray-400">
              Nenhuma descrição fornecida para este formulário.
            </span>
          )}
        </CardDescription>
        <div className="flex justify-between text-xs text-gray-500">
          {form.published && (
            <span className="flex items-center gap-2">
              <LuView className="text-primary h-4 w-4" />
              <span>{form.visits ? form.visits.toLocaleString() : "0"}</span>
            </span>
          )}
          {form.published && (
            <span className="flex items-center gap-2">
              <FaWpforms className="text-primary h-4 w-4" />
              <span>
                {form.submissions ? form.submissions.toLocaleString() : "0"}
              </span>
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end p-2">
        <Link href={`/forms/${form.id}`}>
          <Button variant="secondary" className="flex items-center gap-2">
            {form.published ? "Visualizar" : "Editar"}
            {form.published ? (
              <BiRightArrowAlt className="h-5 w-5" />
            ) : (
              <FaEdit className="h-5 w-5" />
            )}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default FormCard;
