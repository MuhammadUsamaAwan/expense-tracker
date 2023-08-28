import { Modal, Button, Select, NumberInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useLocalStorage } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { IconPlus } from '@tabler/icons-react';

type CreateExpenseProps = {
  opened: boolean;
  close: () => void;
};

export default function CreateExpense({ opened, close }: CreateExpenseProps) {
  const [categories, setCategories] = useLocalStorage<string[]>({
    key: 'categories',
    defaultValue: [],
  });

  const [expenses, setExpenses] = useLocalStorage<{ date: string; category: string; amount: number }[]>({
    key: 'expenses',
    defaultValue: [],
  });

  const form = useForm<{
    category: string | undefined;
    amount: number | undefined;
    date: Date;
  }>({
    initialValues: {
      category: undefined,
      amount: undefined,
      date: new Date(),
    },
  });

  return (
    <Modal
      opened={opened}
      onClose={() => {
        form.reset();
        close();
      }}
      title='Add Expense'
    >
      <form
        onSubmit={form.onSubmit(values => {
          const { category, amount, date } = values;
          if (!category || !amount || !date) return;

          setExpenses([...expenses, { category, amount, date: date.toString() }]);
          close();
        })}
        className='pb-4'
      >
        <DatePickerInput
          {...form.getInputProps('date')}
          label='Date'
          placeholder='Pick date'
          maxDate={new Date()}
          className='mb-2'
        />
        <Select
          {...form.getInputProps('category')}
          label='Category'
          placeholder='Select Category'
          searchable
          className='mb-2'
          data={categories.map(category => ({ value: category, label: category }))}
          creatable
          getCreateLabel={value => `+ Create ${value}`}
          onCreate={value => {
            setCategories([...categories, value]);
            return { value, label: value };
          }}
        />
        <NumberInput
          {...form.getInputProps('amount')}
          label='Amount'
          placeholder='Enter Amount'
          hideControls
          className='mb-3'
        />
        <Button leftIcon={<IconPlus />} type='submit' className='w-full'>
          Add Expense
        </Button>
      </form>
    </Modal>
  );
}
