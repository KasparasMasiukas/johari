export interface Form {
  name: string,
  gender: Gender,
  traits: number[]
}

export type FormType = {
  name: string,
  gender: Gender,
  traits: number[]
}

export type Gender = 'male' | 'female'
