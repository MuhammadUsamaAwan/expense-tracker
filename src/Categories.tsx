import { useState } from 'react';
import { Modal, Table, ActionIcon, Input, Button } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { IconTrashX } from '@tabler/icons-react';

type CategoriesProps = {
  opened: boolean;
  close: () => void;
};

export default function Categories({ opened, close }: CategoriesProps) {
  const [category, setCategory] = useState('');

  const [categories, setCategories] = useLocalStorage<string[]>({
    key: 'categories',
    defaultValue: [],
  });

  const [expenses, setExpenses] = useLocalStorage<{ date: string; category: string; amount: number }[]>({
    key: 'expenses',
    defaultValue: [],
  });

  const handleDelete = (index: number) => {
    const newCategories = [...categories];
    newCategories.splice(index, 1);
    setCategories(newCategories);
    setExpenses(expenses.filter(expense => expense.category !== categories[index]));
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setCategory('');
        close();
      }}
      title='Manage Categories'
    >
      <form
        className='flex space-x-2 mb-3'
        onSubmit={e => {
          e.preventDefault();
          setCategories([...categories, category]);
          setCategory('');
        }}
      >
        <Input
          placeholder='Category'
          className='flex-1'
          size='sm'
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        <Button type='submit'>Add</Button>
      </form>
      {categories.length > 0 ? (
        <Table striped withBorder withColumnBorders className='pb-4'>
          <thead>
            <tr>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td>{category}</td>
                <td>
                  <ActionIcon onClick={() => handleDelete(index)}>
                    <IconTrashX size='1.25rem' />
                  </ActionIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className='text-center'>No categories yet</p>
      )}
    </Modal>
  );
}
