// AddEditVenue.tsx
import { useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Control } from "react-hook-form";
import { venueSchema } from "../../../shared/lib/validations";

export type VenueForm = {
  name: string;
  location: string;
  imageUrls: string[];
  popularDrinks: string[];
  description?: string; // Add description to VenueForm
  instagram?: string;
  facebook?: string;
  website?: string;
  days: string[];
  hours: string;
};

const defaultValues: VenueForm = {
  name: "",
  location: "",
  imageUrls: [""],
  popularDrinks: [""],
  description: "", // Initialize description field
  instagram: "",
  facebook: "",
  website: "",
  days: [],
  hours: "",
};

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const AddEditVenue = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<VenueForm>({
    resolver: zodResolver(venueSchema),
    defaultValues,
  });

  const { fields: imageFields, append: appendImage } = useFieldArray({
    control: control as Control<VenueForm>,
    // @ts-expect-error Type mismatch due to type inference issues in `useFieldArray`.
    name: "imageUrls",
  });

  const { fields: drinkFields, append: appendDrink } = useFieldArray({
    control: control as Control<VenueForm>,
    // @ts-expect-error Type mismatch due to type inference issues in `useFieldArray`.
    name: "popularDrinks",
  });

  const selectedDays = watch("days");

  const toggleDay = (day: string) => {
    const newDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    setValue("days", newDays);
  };

  const onSubmit = (data: VenueForm) => {
    console.log("Submit data:", data);
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-8 text-center">
        {isEdit ? "Edit Venue" : "Add New Venue"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* Basic Info */}
        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="form-label">Venue Name</label>
            <input {...register("name")} className="form-input" />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>

          <div>
            <label className="form-label">Location</label>
            <input {...register("location")} className="form-input" />
            {errors.location && <p className="form-error">{errors.location.message}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="form-label">Description</label>
          <textarea
            {...register("description")}
            className="form-input"
            placeholder="Add a brief description of the venue"
          />
          {errors.description && <p className="form-error">{errors.description.message}</p>}
        </div>

        {/* Images */}
        <div>
          <label className="form-label">Image URLs</label>
          <div className="space-y-2">
            {imageFields.map((field, idx) => (
              <input
                key={field.id}
                {...register(`imageUrls.${idx}`)}
                className="form-input"
                placeholder={`Image URL ${idx + 1}`}
              />
            ))}
            <button type="button" onClick={() => appendImage("")} className="form-button">
              + Add Image
            </button>
            {errors.imageUrls && <p className="form-error">{errors.imageUrls.message}</p>}
          </div>
        </div>

        {/* Popular Drinks */}
        <div>
          <label className="form-label">Popular Drinks</label>
          <div className="space-y-2">
            {drinkFields.map((field, idx) => (
              <input
                key={field.id}
                {...register(`popularDrinks.${idx}`)}
                className="form-input"
                placeholder={`Drink ${idx + 1}`}
              />
            ))}
            <button type="button" onClick={() => appendDrink("")} className="form-button">
              + Add Drink
            </button>
            {errors.popularDrinks && <p className="form-error">{errors.popularDrinks.message}</p>}
          </div>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="form-label">Instagram</label>
            <input {...register("instagram")} className="form-input" />
            {errors.instagram && <p className="form-error">{errors.instagram.message}</p>}
          </div>
          <div>
            <label className="form-label">Facebook</label>
            <input {...register("facebook")} className="form-input" />
            {errors.facebook && <p className="form-error">{errors.facebook.message}</p>}
          </div>
          <div>
            <label className="form-label">Website</label>
            <input {...register("website")} className="form-input" />
            {errors.website && <p className="form-error">{errors.website.message}</p>}
          </div>
        </div>

        {/* Days */}
        <div>
          <label className="form-label">Opening Days</label>
          <div className="flex flex-wrap gap-2">
            {weekDays.map((day) => (
              <button
                type="button"
                key={day}
                onClick={() => toggleDay(day)}
                className={`px-4 py-1 rounded-full border transition text-sm ${selectedDays.includes(day)
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {day}
              </button>
            ))}
          </div>
          {errors.days && <p className="form-error">{errors.days.message}</p>}
        </div>

        {/* Hours */}
        <div>
          <label className="form-label">Opening Hours</label>
          <input {...register("hours")} className="form-input" />
          {errors.hours && <p className="form-error">{errors.hours.message}</p>}
        </div>

        <div className="text-end">
          <button type="submit" className="bg-primary-600 text-white px-6 py-2 rounded hover:bg-primary-700">
            {isEdit ? "Update Venue" : "Create Venue"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditVenue;