import React from 'react';
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import type { MultiValue } from 'react-select';
import Button from '@mui/material/Button';
import Select from '../../ui/component/Select/Select';
import RichTextBox from '../../ui/component/RichTextBox/RichTextBox';
import ListWrapper from './WriteNews.styles';
import newsValidation from '../../validation/newsValidation';
import config from '../../utils/constant';
import { useAppSelector } from '../../store/hooks';
import { setNews } from '../../api/newsApi';
import showToast from '../../validation/showToast';

type OptionType ={
  label: string;
  value: number;
};

const WriteNews: React.FC = () => {
  const navigate = useNavigate();
  const topics = useAppSelector(({ newsPortal }) => newsPortal.topics);

  const topicsOptions = React.useMemo(() => {
    const options: {
      label: string;
      value: number;
    }[] = [];
    topics?.map((topic) => {
      return options.push({
        label: topic.topic,
        value: topic.topicId,
      });
    });
    return options;
  }, [topics]);

  type InitialValuesType = {
    title: string;
    content: string;
    topics: OptionType[];
    dateOfPublication: Date;
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      topics: [],
      dateOfPublication: new Date(),
    } as InitialValuesType,
    validationSchema: newsValidation,
    onSubmit: async (values) => {
      try {
        const data = {
          title: values.title.trim(),
          content: values.content.trim(),
          topics: values.topics.map((topic) => topic.value),
          dateOfPublication: values.dateOfPublication,
        };

        await setNews(data);

        navigate(config.localPath.news);
      } catch (err) {
        if (err instanceof AxiosError) {
          showToast(err.message);
        }
      }
    },
  });

  const handleSelectChange = (newValue: MultiValue<OptionType>) => {
    formik.setFieldValue('topics', newValue as OptionType[]);
  };

  const handleRichTextChange = (arg0: {
    target: {
      value: string;
      name: string;
    };
  }) => {
    formik.setFieldValue('content', arg0.target.value);
  };

  const setDate = (date: Date | null) => {
    if (!date) {
      return;
    }
    formik.setFieldValue('dateOfPublication', date);
  };

  const toClear = () => {
    formik.resetForm();
  };

  const toPreview = () => {
    //
  };

  return (
    <ListWrapper>
      <form onSubmit={formik.handleSubmit}>
        <div className="task-item">
          <p>Title:</p>
          <TextField
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.title && formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            margin="normal"
            placeholder="Название новости"
            fullWidth
          />
        </div>

        <div className="task-item">
          <p>Topic:</p>
          <Select
            name="topics"
            value={formik.values.topics}
            classNamePrefix="select"
            className="select-item"
            placeholder="Тема"
            options={topicsOptions}
            onChange={handleSelectChange}
            isMulti
          />
        </div>

        <div className="task-item">
          <p>Date of Publish:</p>
          <DatePicker
            selected={formik.values.dateOfPublication}
            onChange={setDate}
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            showTimeInput
          />
        </div>

        <div className="task-item">
          <RichTextBox
            name="content"
            value={formik.values.content}
            label="Контент"
            onChange={handleRichTextChange}
            onBlur={() => formik.handleBlur('content')}
          />
        </div>

        <div className="button-grioup">
          <Button
            className="button-item"
            variant="outlined"
            onClick={toClear}
          >
            Очистить
          </Button>

          <Button
            className="button-item"
            variant="outlined"
            onClick={toPreview}
          >
            Предпросмотр
          </Button>

          <Button
            type="submit"
            className="button-item"
            variant="outlined"
          >
            Отравить
          </Button>
        </div>
      </form>
    </ListWrapper>
  );
};

export default WriteNews;
