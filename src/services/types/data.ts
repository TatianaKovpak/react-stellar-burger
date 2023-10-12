export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    id?: string;
    index? :number | null
    };

  export type TArr = {
    arr:TIngredient[]
}  

  export type TOrder = {
    createdAt: string;
    ingredients: string[] | TIngredient[] | null[] ;
    name: string;
    number: number;
    status: string;
    updatedAt: string;
    _id: string;
  };

  export type TOrders = {
    success: boolean;
    orders: TOrder[];
    total: number;
    totalToday: number;
  }

  export type TUser = {
    email: string;
    name: string;
  }

  export interface IBurgerIngredient {
    props: TIngredient;
    handleClose?: (() => void) | undefined;
    index?: number;
    _id: string;
    i?: TIngredient
}

export type TModal = {
  children: boolean | object;
  isOpened: boolean;
  onClose: (() => void);
 

}

export type TOverlayModal = {
  active: boolean
}

export type TForm = {
  email?: string;
  name?: string;
  password?: string;
  token?: string

}