export interface category 
{
    id?: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CategoryFormData 
{
    categories: string[];
}