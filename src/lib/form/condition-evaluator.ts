import type { ConditionOperator, Field } from '@/types/form'

export function isFieldVisible(
  field: Field,
  formValues: Record<string, unknown>,
): boolean {
  if (!field.condition) {
    return true
  }

  const { field: dependentFieldId, operator, value } = field.condition
  const currentValue = formValues[dependentFieldId]

  return evaluateCondition(operator, currentValue, value)
}

export function evaluateCondition(
  operator: ConditionOperator,
  currentValue: unknown,
  expectedValue: unknown,
): boolean {
  const currentStr = String(currentValue ?? '')
  const expectedStr = String(expectedValue ?? '')

  switch (operator) {
    case 'EQUALS':
      return currentStr === expectedStr
    case 'NOT_EQUALS':
      return currentStr !== expectedStr
    case 'GT': {
      const currentNum = Number(currentStr)
      const expectedNum = Number(expectedStr)
      if (!Number.isNaN(currentNum) && !Number.isNaN(expectedNum)) {
        return currentNum > expectedNum
      }
      return false
    }
    case 'LT': {
      const currentNum = Number(currentStr)
      const expectedNum = Number(expectedStr)
      if (!Number.isNaN(currentNum) && !Number.isNaN(expectedNum)) {
        return currentNum < expectedNum
      }
      return false
    }
    default:
      return true
  }
}

export function getVisibleFieldIds(
  fields: Field[],
  formValues: Record<string, unknown>,
): Set<string> {
  const visibleIds = new Set<string>()
  for (const field of fields) {
    if (isFieldVisible(field, formValues)) {
      visibleIds.add(field.id)
    }
  }
  return visibleIds
}

export function getDependentFields(fields: Field[], fieldId: string): Field[] {
  return fields.filter(field => field.condition?.field === fieldId)
}
