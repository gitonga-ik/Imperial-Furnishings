import { Card, SectionTitle } from "@/app/components/admin/FormField";
import RegisterForm from "./RegisterForm";
import {getRoles} from "@/services/roles"

export const metadata = { title: "Register Staff" };

export default async function RegisterPage() {
  const { payload } = await getRoles();

  return (
    <div className="max-w-xl">
      <Card>
        <SectionTitle>Register New Staff Member</SectionTitle>
        <RegisterForm roles={payload} />
      </Card>
    </div>
  );
}
