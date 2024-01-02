import { useCallback, useEffect, useRef, useState } from "react";

export default function useForm(formName) {
  const
    [inputs, setInputs] = useState(undefined),
    base = useRef(undefined),
    
    handleChange = useCallback((e) => {
      setInputs((i) => {
        const 
          target = e.target,
          aName = target.name;

        i[aName].hasMssg = true
        i[aName].value = target.value;
        i[aName].validationMessage = target.validationMessage

        return JSON.parse(JSON.stringify(i))
      })
    }, []),

    resetForm = useCallback(() => {
      setInputs(base.current)
    }, [])

  useEffect(() => {
    const formInputs = Object.fromEntries(
      Array
        .from(document.forms[formName].elements)
        .filter(({ nodeName }) => nodeName === 'INPUT')
        .map(({ name, value }) => [name, {value, hasMssg: false}])
    )

    setInputs(formInputs)
    base.current = structuredClone(formInputs)
  }, [formName])

  return [
    inputs,
    handleChange,
    resetForm,
  ]
}