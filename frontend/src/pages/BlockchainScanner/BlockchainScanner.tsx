import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  LinearProgress,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { ApiPromise } from '@polkadot/api';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import EventsTable, { BlockEvent } from '../../components/EventsTable/EventsTable';
import { DEFAULT_API_URL } from '../../constants/api.constants';
import { WSS_URL_REGEX } from '../../constants/validation.constants';
import { createPolkadotApi } from '../../utils/polkadot-api.utils';

interface FormValues {
  startBlock: number | undefined;
  endBlock: number | undefined;
  endpoint: string;
}

const defaultValues: FormValues = { startBlock: undefined, endBlock: undefined, endpoint: DEFAULT_API_URL };

const BlockchainScanner = (): JSX.Element => {
  const { register, handleSubmit, formState, getValues, setValue, watch } = useForm<FormValues>({
    defaultValues,
    mode: 'onChange',
  });
  const [blockEvents, setBlockEvents] = useState<BlockEvent[]>([]);
  const [scanningProgress, setScanningProgress] = useState<number>(0);
  const currentEndpoint = useRef<string>(defaultValues.endpoint);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const api = useRef<ApiPromise>();

  useEffect(() => {
    const setInitialEndBlockValue = async () => {
      api.current = await createPolkadotApi(currentEndpoint.current);
      const latestBlock = await api.current?.rpc.chain.getBlock();
      setValue('endBlock', latestBlock?.block.header.number.toNumber());
    };

    setInitialEndBlockValue();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const fetchEvents = async ({ startBlock, endBlock, endpoint }: FormValues): Promise<void> => {
    setBlockEvents([]);
    setScanningProgress(0);

    // we only create a new api client if the endpoint has changed
    if (endpoint !== currentEndpoint.current) {
      currentEndpoint.current = endpoint;
      api.current = undefined;
      api.current = await createPolkadotApi(currentEndpoint.current);
    }

    if (!api.current) {
      console.error('Api client could not initialize.');
      setSnackbarMessage('Api client could not initialize.');
      setSnackbarOpen(true);
      return;
    }

    if (startBlock && endBlock && api.current) {
      // we go through every block from the start and end block and add their events to display in the table

      for (let current = startBlock; current <= endBlock; current++) {
        const currentProgress = (100 * (current - startBlock)) / (endBlock - startBlock);
        const hash = await api.current.rpc.chain.getBlockHash(current);
        const apiAt = await api.current.at(hash);
        const now = (await apiAt.query.timestamp.now()).toString();
        const timestamp = new Date(parseInt(now)).toISOString();

        await apiAt.query.system.events((events: { event: any }[]) => {
          const newBlockEvents: BlockEvent[] = [];

          events.forEach((record: { event: any }) => {
            const { event } = record;

            const blockEvent: BlockEvent = {
              id: event.hash.toString(),
              blockNumber: current,
              eventName: event.method,
              eventArguments: JSON.stringify(event.data, null, 2),
              timestamp,
            };

            newBlockEvents.push(blockEvent);
          });

          setBlockEvents((prevBlockEvents: BlockEvent[]) => [...prevBlockEvents, ...newBlockEvents]);
        });

        setScanningProgress(endBlock === current ? 100 : currentProgress);
      }
    }
  };

  const onSubmit = async () => {
    if (formState.isValid) {
      await fetchEvents(getValues());
    }
  };

  return (
    <div className="flex flex-col py-6">
      <div className="mb-6">
        <form
          className="flex items-center"
          aria-label="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl className="mr-6" error={!!formState.errors.startBlock}>
            <TextField
              required
              type="number"
              label="Start Block"
              id="start-block-input"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                'data-testid': 'start-block-input',
                ...register('startBlock', {
                  required: { value: true, message: 'Start block is required' },
                  valueAsNumber: true,
                }),
              }}
            />
            <FormHelperText>{formState.errors?.startBlock?.message}</FormHelperText>
          </FormControl>
          <FormControl className="mr-6" variant="standard" error={!!formState.errors.endBlock}>
            <TextField
              id="end-block-input"
              label="End Block"
              required
              type="number"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                'data-testid': 'end-block-input',
                ...register('endBlock', {
                  required: { value: true, message: 'End block is required' },
                  valueAsNumber: true,
                }),
              }}
            />
            <FormHelperText>{formState.errors?.endBlock?.message}</FormHelperText>
          </FormControl>
          <FormControl className="mr-6 w-80" variant="standard" error={!!formState.errors.endpoint}>
            <TextField
              id="endpoint-input"
              label="Endpoint"
              required
              InputLabelProps={{ shrink: true }}
              inputProps={{
                'data-testid': 'endpoint-input',
                ...register('endpoint', {
                  required: { value: true, message: 'Endpoint is required' },
                  pattern: {
                    value: WSS_URL_REGEX,
                    message: 'Endpoint format is invalid',
                  },
                }),
              }}
            />
            <FormHelperText>{formState.errors?.endpoint?.message}</FormHelperText>
          </FormControl>
          <Button type="submit" data-testid="submit-button" disabled={!formState.isValid} variant="contained">
            Scan
          </Button>
        </form>
      </div>
      <div className="my-3">
        <Box className="flex items-center">
          <Box className="w-full mr-1">
            <LinearProgress variant="determinate" value={scanningProgress} />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">{`${Math.round(scanningProgress)}%`}</Typography>
          </Box>
        </Box>
      </div>

      <div className="flex h-full w-full">
        <EventsTable data={blockEvents} />
      </div>

      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default BlockchainScanner;
