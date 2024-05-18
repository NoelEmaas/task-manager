<script setup>
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import axios from "axios"

// UI Components
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

// Lucide Icons
import { CalendarDays, Plus } from 'lucide-vue-next'

// Date Utilities
import {
  DateFormatter,
  getLocalTimeZone,
} from '@internationalized/date'

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const title = ref()
const date = ref()
const openModal = ref(false)
const emit = defineEmits(['updateTaskList'])

const createTask = async () => {
    openModal.value = false;

    const taskData = {
        title: title.value,
        due: date.value ? date.value.toDate() : null,
        status: false,
    };
    
    try {
        const response = await axios.post("http://localhost:3000/task", taskData);
        emit('updateTaskList')
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <Dialog v-model:open="openModal">
        <DialogTrigger as-child>
            <slot name="trigger">
            </slot>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px] w-full">
            <DialogHeader>
                <DialogTitle>Add new task</DialogTitle>
                <DialogDescription>
                    Please fill in the form below.
                </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
                <div class="grid w-full max-w-sm items-center gap-1.5">
                    <Label for="title">Title</Label>
                    <Input id="title" type="text" v-model="title"/>
                </div>
                <div class="grid w-full gap-1.5">
                    <Label for="due-date">Due date (optional)</Label>
                    <Popover>
                        <PopoverTrigger as-child>
                            <Button
                                id="due-date"
                                variant="outline"
                                :class="cn(
                                'w-full justify-start text-left font-normal',
                                !date && 'text-muted-foreground',
                                )"
                            >
                                <CalendarDays class="mr-2 h-4 w-4" />
                                {{ date ? df.format(date.toDate(getLocalTimeZone())) : "Pick a date" }}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent class="w-auto p-0" side="top">
                            <Calendar v-model="date" initial-focus />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <DialogFooter>
                <Button type="submit" @click="createTask">
                    Save Task
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>