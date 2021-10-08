import * as yup from "yup";

/** Adding just additional methods here */

// yup.addMethod(yup.string, "URL", function (...args) {
//   return this.url(...args);
// });

// const validator = function (message) {
//   return this.test("is-string-boolean", message, function (value) {
//     if (isEmpty(value)) {
//       return true;
//     }

//     if (["Y", "N"].indexOf(value) !== -1) {
//       return true;
//     } else {
//       return false;
//     }
//   });
// };

// yup.addMethod(yup.string, "stringBoolean", validator);
// yup.addMethod(yup.string, "StringBoolean", validator);

export function createYupSchema(schema, config) {
  const { field, validations } = config;

  if (!validations) return schema;

  if (field.indexOf(".") !== -1) {
    const reversePath = field.split(".").reverse();
    const currNestedObject = reversePath.slice(1).reduce(
      (yupObj, path) => {
        return { [path]: yup.object().shape(yupObj) };
      },
      { [reversePath[0]]: validations }
    );

    return { ...schema, ...currNestedObject };
  }

  return { ...schema, [field]: validations };
}

export const getYupSchemaFromMetaData = (
  metadata,
  additionalValidations = [],
  forceRemove = []
) => {
  let yepSchema = metadata.reduce(createYupSchema, {});

  const mergedSchema = {
    ...yepSchema,
    ...additionalValidations,
  };

  forceRemove.forEach((field) => {
    delete mergedSchema[field];
  });

  const validateSchema = yup.object().shape(mergedSchema);
  return validateSchema;
};
