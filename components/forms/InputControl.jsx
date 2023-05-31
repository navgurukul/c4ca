import { Error } from "@mui/icons-material";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { findInputError, isFormInvalid } from "./utils";

const InputControl = ({
  label,
  type,
  id,
  name,
  placeholder,
  multiline,
  validation,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const inputError = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputError);

  return (
    <Box sx={{ display: "grid", gap: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {label && <label htmlFor={id}>{label}</label>}
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && (
            <InputError
              message={inputError.error.message}
              key={inputError.error.message}
            />
          )}
        </AnimatePresence>
      </Box>
      {multiline ? (
        <textarea
          rows="4"
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          {...register(`${name}`, validation)}
        ></textarea>
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          {...register(name, validation)}
        />
      )}
    </Box>
  );
};

export default InputControl;

const InputError = ({ message }) => {
  return (
    <motion.p className="errorMsg" {...framer_error}>
      <Error /> {message}
    </motion.p>
  );
};

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};
