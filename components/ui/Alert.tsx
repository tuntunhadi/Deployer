import React from 'react';
import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';
import clsx from 'clsx';

interface AlertProps {
  variant: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ variant, title, message, onClose }) => {
  const variants = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      title: 'text-green-900',
      message: 'text-green-700',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: <XCircle className="w-5 h-5 text-red-600" />,
      title: 'text-red-900',
      message: 'text-red-700',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: <AlertCircle className="w-5 h-5 text-yellow-600" />,
      title: 'text-yellow-900',
      message: 'text-yellow-700',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: <Info className="w-5 h-5 text-blue-600" />,
      title: 'text-blue-900',
      message: 'text-blue-700',
    },
  };

  const style = variants[variant];

  return (
    <div className={clsx('rounded-lg border p-4 flex gap-3', style.bg, style.border)}>
      {style.icon}
      <div className="flex-1">
        {title && <h3 className={clsx('font-medium text-sm', style.title)}>{title}</h3>}
        <p className={clsx('text-sm', style.message)}>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-secondary-400 hover:text-secondary-600 transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;
