import { CreateItemInput, Item } from '../../hooks/graphql'

export interface FormInterface {
  Label: string
  key: keyof CreateItemInput
}
export interface dataTableHeaderProps {
  value: string
  check: boolean
}
export const initialValues: CreateItemInput = {
  brandName: '',
  buyPrice: 0,
  color: '',
  maxPrice: 0,
  minPrice: 0,
  minQuantity: 0,
  model: '',
  quantity: 0,
  supplierName: '',
  id: ''
}
export const valuesKeys: FormInterface[] = [
  { Label: 'Code a barre', key: 'id' },
  { Label: 'Fornisseur', key: 'supplierName' },
  { Label: 'Marque', key: 'brandName' },
  { Label: 'Model', key: 'model' },
  { Label: 'Color', key: 'color' },
  { Label: 'Quantity', key: 'quantity' },
  { Label: 'Min Quantity', key: 'minQuantity' },
  { Label: "Prix d'achat", key: 'buyPrice' },
  { Label: 'min Prix', key: 'minPrice' },
  { Label: 'max Prix', key: 'maxPrice' }
]
export const valuesKeys2: FormInterface[] = [
  { Label: 'Fornisseur', key: 'supplierName' },
  { Label: 'Marque', key: 'brandName' },
  { Label: 'Model', key: 'model' },
  { Label: 'Color', key: 'color' },
  { Label: 'Quantity', key: 'quantity' },
  { Label: 'Min Quantity', key: 'minQuantity' },
  { Label: "Prix d'achat", key: 'buyPrice' },
  { Label: 'min Prix', key: 'minPrice' },
  { Label: 'max Prix', key: 'maxPrice' }
]
export const dataTableHeader : dataTableHeaderProps[] = [
  { check:true, value: 'Code a barre' },
  { check:true, value: 'Fornisseur' },
  { check:true, value: 'Marque' },
  { check:true, value: 'Model' },
  { check:true, value: 'Color' },
  { check:true, value: 'Quantity' },
  { check:true, value: 'Min Quantity' },
  { check:true, value: "Prix d'achat" },
  { check:true, value: 'min Prix' },
  { check:true, value: 'max Prix' }
]
export const Keys: Array<keyof Item> = [
  'id',
  'brand',
  'model',
  'buyPrice',
  'color',
  'maxPrice',
  'minPrice',
  'minQuantity',
  'quantity',
  'selected',
  'supplier'
]
