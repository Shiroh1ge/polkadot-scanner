import { Box, Button, FormControl, FormHelperText, InputLabel, TextField, useFormControl } from '@mui/material';
import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import EventsTable from '../../components/Table/EventsTable';
import { FormGroup, Input } from '@mui/material';
import { useForm } from 'react-hook-form';

interface FormValues {
  startBlock: number;
  endBlock: number;
  endpoint: string;
}

const defaultValues: FormValues = { startBlock: 0, endBlock: 0, endpoint: 'wss://rpc.polkadot.io' };

const BlockchainScanner = (): JSX.Element => {
  const { focused } = useFormControl() || {};
  const { register, handleSubmit, reset, watch, getValues, formState, setValue } = useForm<FormValues>({ defaultValues });
  const formValues = getValues();

  // register('startBlock', { required: true })

  console.log('watchChanges', formState);


  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value }: { name: keyof FormValues; value: any } = e.target;
    let parsedValue = value;

    if (name === 'endBlock' || name === 'startBlock') {
      parsedValue = parseInt(value || 0, 10);
    }

    setValue(name, parsedValue);

    console.log('formValues', getValues());
    console.log('state', formState.dirtyFields);
    console.log('err', formState.errors);
  };

  const onSubmit = (data: FormValues) => console.log('formdata', data);
  return (
    <div className="flex flex-col py-6">
      <div className="mb-6">
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl className="mr-6" error={!!formState.errors.startBlock && formState.dirtyFields.startBlock}>
            <TextField
              required
              type="number"
              label="Start Block"
              id="start-block"
              {...register('startBlock', { required: true, onChange: handleInputChange, valueAsNumber: true })}
            />
            <FormHelperText>Error</FormHelperText>
          </FormControl>
          <FormControl className="mr-6" variant="standard">
            <TextField id="my-input" label="End Block" required {...register('endBlock', {
              required: { value: true, message: 'End block is required' },
              onChange: handleInputChange,
              valueAsNumber: true
            })}
            />
          </FormControl>
          <FormControl className="mr-6" variant="standard">
            <TextField id="my-input" label="Endpoint" required {...register('endpoint', {
              required: { value: true, message: 'Endpoint is required' },
              onChange: handleInputChange,
              valueAsNumber: true
            })}/>
          </FormControl>
          <Button type="submit" disabled={!formState.isValid}>Submit</Button>
        </form>


      </div>

      <div className="flex h-full w-full">
        <EventsTable/>
      </div>
    </div>
  );
};

export default BlockchainScanner;
