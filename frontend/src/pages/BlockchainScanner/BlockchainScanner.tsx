import { Button, FormControl, FormHelperText, TextField } from '@mui/material';
import React from 'react';
import EventsTable from '../../components/Table/EventsTable';
import { useForm } from 'react-hook-form';

interface FormValues {
  startBlock: number | undefined;
  endBlock: number | undefined;
  endpoint: string;
}

const defaultValues: FormValues = { startBlock: undefined, endBlock: undefined, endpoint: 'wss://rpc.polkadot.io' };

const BlockchainScanner = (): JSX.Element => {
  const { register, handleSubmit, formState } = useForm<FormValues>({ defaultValues, mode: 'onChange' });

  const onSubmit = (data: FormValues) => console.log('formdata', data);
  return (
    <div className="flex flex-col py-6">
      <div className="mb-6">
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl className="mr-6" error={!!formState.errors.startBlock}>
            <TextField
              required
              type="number"
              label="Start Block"
              id="start-block"
              inputProps={register('startBlock', {
                required: { value: true, message: 'Start block is required' },
                valueAsNumber: true
              })}

            />
            <FormHelperText>{formState.errors?.startBlock?.message}</FormHelperText>
          </FormControl>
          <FormControl className="mr-6" variant="standard" error={!!formState.errors.endBlock}>
            <TextField id="my-input"
                       label="End Block"
                       required
                       type="number"
                       inputProps={register('endBlock', {
                         required: { value: true, message: 'End block is required' },
                         valueAsNumber: true
                       })}
            />
            <FormHelperText>{formState.errors?.endBlock?.message}</FormHelperText>
          </FormControl>
          <FormControl className="mr-6" variant="standard" error={!!formState.errors.endpoint}>
            <TextField id="my-input" label="Endpoint" required
                       inputProps={register('endpoint', {
                         required: { value: true, message: 'Endpoint is required' }
                       })}/>
            <FormHelperText>{formState.errors?.endpoint?.message}</FormHelperText>
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
