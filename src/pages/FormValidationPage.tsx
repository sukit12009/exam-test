import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as FiIcons from "react-icons/fi";

import { formSchema, FormData } from "../types/form";
import InputField from "../components/form/InputField";
import FormHeader from "../components/form/FormHeader";
import SuccessMessage from "../components/form/SuccessMessage";
import TermsCheckbox from "../components/form/TermsCheckbox";
import SubmitButton from "../components/form/SubmitButton";

// Create typed icon components
const FiUser = FiIcons.FiUser as React.ComponentType<
  React.SVGProps<SVGSVGElement>
>;
const FiMail = FiIcons.FiMail as React.ComponentType<
  React.SVGProps<SVGSVGElement>
>;
const FiLock = FiIcons.FiLock as React.ComponentType<
  React.SVGProps<SVGSVGElement>
>;
const FiPhone = FiIcons.FiPhone as React.ComponentType<
  React.SVGProps<SVGSVGElement>
>;

const FormValidationPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted:", data);
    reset();
  };

  const handleResetForm = () => {
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <FormHeader
          title="Create an Account"
          subtitle="Join us today! Fill out the form to get started."
        />

        {isSubmitSuccessful ? (
          <SuccessMessage onReset={handleResetForm} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <InputField
                  label="First Name"
                  type="text"
                  icon={<FiUser className="h-4 w-4" />}
                  error={errors.firstName?.message}
                  {...register("firstName")}
                  placeholder="John"
                />
              </div>
              <div>
                <InputField
                  label="Last Name"
                  type="text"
                  icon={<FiUser className="h-4 w-4" />}
                  error={errors.lastName?.message}
                  {...register("lastName")}
                  placeholder="Doe"
                />
              </div>
            </div>

            <InputField
              label="Email Address"
              type="email"
              icon={<FiMail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register("email")}
              placeholder="you@example.com"
            />

            <InputField
              label="Phone Number"
              type="tel"
              icon={<FiPhone className="h-4 w-4" />}
              error={errors.phone?.message}
              {...register("phone")}
              placeholder="+66 123 456 789"
            />

            <InputField
              label="Password"
              type="password"
              icon={<FiLock className="h-4 w-4" />}
              error={errors.password?.message}
              {...register("password")}
              placeholder="••••••••"
            />

            <InputField
              label="Confirm Password"
              type="password"
              icon={<FiLock className="h-4 w-4" />}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
              placeholder="••••••••"
            />

            <TermsCheckbox error={errors.acceptTerms} register={register} />

            <SubmitButton
              isSubmitting={isSubmitting}
              label="Create Account"
              loadingLabel="Processing..."
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default FormValidationPage;
