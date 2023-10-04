import React from 'react';
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import { AxiosError } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import type { MultiValue } from 'react-select';

import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import NewsItem from '../NewsItem/NewsItem';
import Select from '../../ui/component/Select/Select';
import RichTextBox from '../../ui/component/RichTextBox/RichTextBox';
import ListWrapper from './WriteNews.styles';
import newsValidation from '../../validation/newsValidation';
import config from '../../utils/constant';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setNews, updateNews } from '../../api/newsApi';
import showToast from '../../validation/showToast';
import { setCurrentNewsList, type INewsType } from '../../store/newsPortalSlice';

type OptionType ={
  label: string;
  value: number;
};

const WriteNews: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const topics = useAppSelector(({ newsPortal }) => newsPortal.topics);
  const user = useAppSelector(({ newsPortal }) => newsPortal.user);
  const news = useAppSelector(({ newsPortal }) => newsPortal.news);
  const [isPreview, setIsPreview] = React.useState(false);
  const [currentNews, setCurrentNews] = React.useState<INewsType | null>(null);
  const [isEdit, setIsEdit] = React.useState(false);

  const updatredNews = location.state?.news as INewsType;

  React.useEffect(() => {
    if (updatredNews) {
      setIsEdit(true);
    }
  }, [updatredNews]);

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

  const initialValueRTopics = React.useMemo(() => {
    if (!updatredNews || !updatredNews.topics) {
      return [];
    }
    return updatredNews.topics.map((topic) => ({
      label: topic.topic,
      value: topic.topicId,
    }));
  }, [updatredNews]);

  const formik = useFormik({
    initialValues: {
      title: updatredNews?.title || '',
      content: updatredNews?.content || '',
      topics: initialValueRTopics,
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

        const startDate = new Date();

        if (isEdit) {
          const updatedNews = await updateNews(updatredNews.newsId, data);
          const editedNewsList = news?.map((news) => {
            if (news.newsId === updatedNews.data.data.newsId) {
              return {
                ...news,
                ...updatedNews.data.data,
              };
            }
            return news;
          });
          if (editedNewsList) {
            dispatch(setCurrentNewsList(editedNewsList));
          }
        } else {
          const newNews = await setNews(data);
          if (news && newNews.data.data.dateOfPublication < startDate) {
            const updatedNewsList = [newNews.data.data, ...news];
            dispatch(setCurrentNewsList(updatedNewsList));
          }
        }

        navigate(config.localPath.news);
      } catch (err) {
        if (err instanceof AxiosError) {
          showToast(err.message);
        }
      }
    },
  });

  React.useEffect(() => {
    if (!user) {
      return;
    }
    const topicIds = formik.values.topics.map((topic) => topic.value);
    const currentTopics = topics?.filter((topic) => topicIds.includes(topic.topicId));

    setCurrentNews({
      ...currentNews,
      newsId: Date.now(),
      title: formik.values.title,
      content: formik.values.content,
      topics: currentTopics || [],
      dateOfPublication: formik.values.dateOfPublication,
      user,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values, topics, user]);

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

  const toOpenPreview = () => {
    setIsPreview(true);
  };

  const toClosePreview = () => {
    setIsPreview(false);
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
            onClick={toOpenPreview}
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

      <Modal
        open={isPreview}
        onClose={toClosePreview}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className="modal-container">
          <NewsItem news={currentNews} />
        </div>
      </Modal>
    </ListWrapper>
  );
};

export default WriteNews;
