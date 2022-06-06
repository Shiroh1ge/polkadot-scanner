import { Button, FormControl, FormHelperText, TextField } from '@mui/material';
import { ApiPromise, WsProvider } from '@polkadot/api';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import EventsTable from '../../components/EventsTable/EventsTable';
import { WSS_URL_REGEX } from '../../constants/validation.constants';
import { createPolkadotApi, usePolkadotApi } from '../../hooks/usePolkadotApi.hook';

interface FormValues {
  startBlock: number | undefined;
  endBlock: number | undefined;
  endpoint: string;
}

const defaultValues: FormValues = { startBlock: undefined, endBlock: undefined, endpoint: 'wss://rpc.polkadot.io' };

const BlockchainScanner = (): JSX.Element => {
    const { register, handleSubmit, formState, getValues, setValue, control } = useForm<FormValues>({ defaultValues, mode: 'onChange' });
    const endpoint = useRef<string>(defaultValues.endpoint);

    const api = useRef<ApiPromise>();

    useEffect(() => {
      const setInitialEndBlockValue = async () => {
        api.current = await createPolkadotApi(defaultValues.endpoint);
        const latestBlock = await api.current.rpc.chain.getHeader();
        setValue('endBlock', latestBlock?.number.toNumber());
      };

      setInitialEndBlockValue();

    }, []);

    const scan = async (values: FormValues): Promise<void> => {
      endpoint.current = values.endpoint;
      console.log('api.current', api);
    };

    const onSubmit = () => {
      console.log('getValues()', getValues());
      if (formState.isValid) {
        scan(getValues());
      }
    };

    return (
      <div className="flex flex-col py-6">
        <div className="mb-6">
          <form
            className="flex items-center"
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
                InputLabelProps={{ shrink: true }}
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
                         InputLabelProps={{ shrink: true }}
                         inputProps={register('endBlock', {
                           required: { value: true, message: 'End block is required' },
                           valueAsNumber: true
                         })}
              />
              <FormHelperText>{formState.errors?.endBlock?.message}</FormHelperText>
            </FormControl>
            <FormControl className="mr-6 w-80" variant="standard" error={!!formState.errors.endpoint}>
              <TextField id="my-input" label="Endpoint" required
                         InputLabelProps={{ shrink: true }}
                         inputProps={register('endpoint', {
                           required: { value: true, message: 'Endpoint is required' },
                           pattern: {
                             value: WSS_URL_REGEX,
                             message: 'Endpoint format is invalid'
                           }
                         })}/>
              <FormHelperText>{formState.errors?.endpoint?.message}</FormHelperText>
            </FormControl>
            <Button type="submit" disabled={!formState.isValid} variant="contained">Scan</Button>
          </form>


        </div>

        <div className="flex h-full w-full">
          <EventsTable/>
        </div>
      </div>
    );
  }
;

export default BlockchainScanner;
